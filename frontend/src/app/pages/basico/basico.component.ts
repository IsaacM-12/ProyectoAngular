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
  public formBasico!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private basicoService: BasicoService
  ) {}

  ngOnInit(): void {
    this.basicoService.getBasicaData().subscribe(
      (data: any[]) => {
        // Mapea los datos para guardar solo los campos 'name' y 'years'
        this.basicaData = data.map((item) => ({
          name: item.name,
          years: item.years,
        }));
      },
      (error: any) => {
        console.error('Error al obtener los datos:', error);
      }
    );

    this.formBasico = this.formBuilder.group({
      name: ['', [Validators.required]],
      years: ['', [Validators.required, Validators.min(18)]],
    });
  }

  send(): any {
    console.log(this.formBasico.value);
    this.basicoService.createBasicaData(this.formBasico.value).subscribe(
      (data: any) => {
        console.log('Data:', data);
      },
      (error: any) => {
        console.error('Error al enviar los datos:', error);
      }
    );
  }
}
