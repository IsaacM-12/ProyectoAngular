import { Component, OnInit } from '@angular/core';
import { BasicoService } from './basico.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-basico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './basico.component.html',
  styleUrl: './basico.component.css',
})
export class BasicoComponent implements OnInit {
  basicaData: any[] = []; // Variable para almacenar los datos

  constructor(private basicoService: BasicoService) {}

  ngOnInit(): void {
    this.basicoService.getBasicaData().subscribe(
      (data: any[]) => {
        this.basicaData = data; // Guarda los datos en la variable
      },
      (error: any) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }
}
