import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BasicService } from '../../service/basic.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { API_ROUTES } from '../../config/api.routes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-strategic-plan',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './StrategicPlan.component.html',
  styleUrls: ['./StrategicPlan.component.css'],
})
export class StrategicPlanComponent implements OnInit {
  strategicPlanData: any[] = [];
  responseMessage: string = '';
  public formStrategicPlan!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private basicoService: BasicService
  ) {}

  loadData(): void {
    this.basicoService
      .getData(`${API_ROUTES.BASE_URL}${API_ROUTES.STRATEGIC_PLAN}`)
      .subscribe(
        (data: any[]) => {
          this.strategicPlanData = data.map((item) => ({
            id: item._id,
            mission: item.mission,
            vision: item.vision,
            startDate: item.startDate,
            endDate: item.endDate,
            name: item.name,
          }));
        },
        (error: any) => {
          console.error('Error al obtener los datos:', error);
        }
      );
  }

  ngOnInit(): void {
    this.loadData();

    this.formStrategicPlan = this.formBuilder.group({
      mission: [''],
      vision: [''],
      endDate: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  async sendData(): Promise<void> {
    try {
      this.responseMessage = await this.basicoService.createData(
        this.formStrategicPlan.value,
        `${API_ROUTES.BASE_URL}${API_ROUTES.STRATEGIC_PLAN}`
      );
      Swal.fire({
        title: '¡Listo!',
        text: this.responseMessage,
        icon: 'success',
        confirmButtonText: 'Aceptar',
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
