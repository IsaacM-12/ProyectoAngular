import { Component, OnInit } from '@angular/core';
import { BasicoService } from './basico.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar esto

@Component({
  selector: 'app-basico',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './basico.component.html',
  styleUrls: ['./basico.component.css'],
})
export class BasicoComponent implements OnInit {
  basicaData: any[] = []; // Variable para almacenar los datos
  formResponse: any[] = []; // Variable para almacenar los datos
  public formBasico!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private basicoService: BasicoService
  ) {}

  private loadData(): void {
    this.basicoService.getBasicaData().subscribe(
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

  deleteBasicaData(id: string): void {
    this.basicoService.deleteBasicaData(id).subscribe(
      (response: any) => {
        console.log('Datos eliminados:', response);
        this.loadData();
      },
      (error: any) => {
        console.error('Error al eliminar los datos:', error);
      }
    );
  }

  ngOnInit(): void {
    this.loadData();

    this.formBasico = this.formBuilder.group({
      name: ['', [Validators.required]],
      years: ['', [Validators.required, Validators.min(18)]],
    });
  }

  send(): any {
    console.log(this.formBasico.value);
    this.basicoService.createBasicaData(this.formBasico.value).subscribe(
      (response: any) => {
        this.formResponse = response.message;
        this.loadData();
      },
      (error: any) => {
        console.error('Error al enviar los datos:', error);
        this.formResponse = error.error.message;
      }
    );
  }
}
