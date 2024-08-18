import { Component, OnInit } from '@angular/core';
import { BasicoService } from './basico.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar esto
import { API_ROUTES } from '../../config/api.routes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-basico',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './basico.component.html',
  styleUrls: ['./basico.component.css'],
})
export class BasicoComponent implements OnInit {
  basicaData: any[] = []; // Variable para almacenar los datos
  responseMessage: string = '';
  public formBasico!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private basicoService: BasicoService
  ) {}

  loadData(): void {
    this.basicoService
      .getData(`${API_ROUTES.BASE_URL}${API_ROUTES.BASICA}`)
      .subscribe(
        (data: any[]) => {
          this.basicaData = data.map((item) => ({
            id: item._id,
            name: item.name,
            years: item.years,
          }));
        },
        (error: any) => {
          console.error('Error al obtener los datos:', error);
        }
      );
  }

  async deleteBasicaData(id: string): Promise<void> {
    try {
      this.responseMessage = await this.basicoService.deleteDataByID(
        id,
        `${API_ROUTES.BASE_URL}${API_ROUTES.BASICA}`
      );
      Swal.fire({
        icon: 'success',
        title: 'Eliminado',
        text: this.responseMessage,
      });
      this.loadData();
    } catch (error) {
      this.responseMessage =
        (error as any).error?.message || 'Error desconocido';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: this.responseMessage,
      });
    }
  }

  ngOnInit(): void {
    this.loadData();

    this.formBasico = this.formBuilder.group({
      name: ['', [Validators.required]],
      years: ['', [Validators.required, Validators.min(10)]],
    });
  }

  async send(): Promise<void> {
    try {
      this.responseMessage = await this.basicoService.createData(
        this.formBasico.value,
        `${API_ROUTES.BASE_URL}${API_ROUTES.BASICA}`
      );
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: this.responseMessage,
      });
      this.loadData();
    } catch (error) {
      this.responseMessage =
        (error as any).error?.message || 'Error desconocido';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: this.responseMessage,
      });
    }
  }
}
