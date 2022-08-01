import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Movement } from '../../models/movement';
import { DatePipe } from '@angular/common';

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';

export interface DialogData {
  _movement: Movement;
  editMode: boolean;
}

@Component({
  selector: 'app-pdfreport',
  templateUrl: './pdfreport.component.html',
  styleUrls: ['./pdfreport.component.css'],
  providers: [DatePipe]
})
export class PdfreportComponent implements OnInit, AfterViewInit {

  public movement!: Movement;
  public myDate!: string;

  constructor(
    public dialogRef: MatDialogRef<PdfreportComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.myDate = this.datePipe.transform(this.data._movement.date, 'dd/MM/yyyy')!;
  }

  ngAfterViewInit(): void{
    this.ExportToPDF();
    this.dialogRef.close();
  }


  public ExportToPDF():void {
    let PDF = new jsPDF();
    var img = new Image()
    img.src = 'assets/img/logo.png'
    PDF.addImage(img, 'png', 14, 2, 30, 11)
    PDF.setFontSize(15);
    autoTable(PDF, { html: '#reportData'})
    PDF.text('Income/Outcome Report',80,9);
    PDF.output('dataurlnewwindow');
  }


}
