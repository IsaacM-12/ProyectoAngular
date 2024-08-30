import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BasicService } from '../../service/basic.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { API_ROUTES } from '../../config/api.routes';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invitations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './Invitations.component.html',
  styleUrl: './Invitations.component.css',
})
export class InvitationsComponent implements OnInit {
  public invitationForm!: FormGroup;
  usersToInvite: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private basicService: BasicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.invitationForm = this.formBuilder.group({
      users: ['', Validators.required],
    });
  }
  loadData(): void {
    this.basicService
      .getData(`${API_ROUTES.BASE_URL}${API_ROUTES.INVITATIONS}`)
      .subscribe(
        (data: any[]) => {
          this.usersToInvite = data.map((item) => ({
            id: item._id,
            name: item.name,
            email: item.email,
          }));
        },
        (error: any) => {
          console.error('Error al obtener los datos:', error);
        }
      );
  }
}
