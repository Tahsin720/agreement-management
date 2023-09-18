import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VendorAgreementDto } from 'src/app/Model/vendorAgreementDto.model';
import { AgreementService } from 'src/app/Services/agreement.service';

@Component({
  selector: 'app-create-agreement',
  templateUrl: './create-agreement.component.html',
  styleUrls: ['./create-agreement.component.sass'],
})
export class CreateAgreementComponent implements OnInit {
  title = 'agreements';
  models: any[] = [];
  model: VendorAgreementDto = {
    vendor_id: 0,
    bl_code: 0,
    document_code: '',
    start: new Date(),
    expiry_date: new Date(),
    File: new File([], ''),
  };

  constructor(
    private agreementService: AgreementService,
    private http: HttpClient
  ) {}

  reactiveroleform!: FormGroup;

  ngOnInit() {
    this.reactiveroleform = new FormGroup({
      vendor_id: new FormControl(null, Validators.required),
      bl_code: new FormControl(null, Validators.required),
      document_code: new FormControl(null, Validators.required),
      start: new FormControl(null, Validators.required),
      expiry_date: new FormControl(null, Validators.required),
      File: new FormControl(null, Validators.required),
    });
    this.agreementService.getAll().subscribe({
      next: (response) => {
        this.models = response.data;
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.reactiveroleform.get('File')?.setValue(file);
    }
  }
  CreateAgreement() {
    if (this.reactiveroleform.valid) {
      const formData = new FormData();
      formData.append(
        'vendor_id',
        this.reactiveroleform.get('vendor_id')?.value
      );
      formData.append('bl_code', this.reactiveroleform.get('bl_code')?.value);
      formData.append(
        'document_code',
        this.reactiveroleform.get('document_code')?.value
      );
      formData.append('start', this.reactiveroleform.get('start')?.value);
      formData.append(
        'expiry_date',
        this.reactiveroleform.get('expiry_date')?.value
      );
      formData.append('File', this.reactiveroleform.get('File')?.value);

      this.agreementService.create(formData).subscribe({
        next: (response) => {
          this.reactiveroleform.reset();
          window.location.reload();
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
    }
  }
}
