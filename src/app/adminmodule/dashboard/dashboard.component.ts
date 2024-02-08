
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/All-Services/api.service';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';

declare var $: any
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit   {
  @ViewChild('excelTable') excelTable: ElementRef | any; 
  
  employeeReport: any = []
  selectedEmployeeDetail:any={}
  modalRef: any;
  
  
  constructor(private _apiService: ApiService,private modalService:NgbModal,private datePipe: DatePipe) { 
    // this.yourElement = element.nativeElement;
  }

  // @ViewChild('excelTable', { static: true }) excelTable: ElementRef | any
  adminId: any
  employeeDetails: any = []
  modalVisible = false;
  ngOnInit(): void {
    this.adminId = localStorage.getItem('adminId')
    this.getAllEmployeeDetails()
    console.log(this.excelTable);
    
  }

  getAllEmployeeDetails() {
    this._apiService.getAllEmployeeDetails(this.adminId).subscribe((res: any) => {
      if (res.statusCode == 200) {

        this.employeeDetails = res.getAllEmployeeDetailByAdminId
      }
    })
  }


  openReport(employeeData:any) {
    
    console.log(employeeData);
    this.selectedEmployeeDetail =employeeData
    this.employeeReport = []

    this._apiService.getEmployeeReport(employeeData.id).subscribe((res: any) => {
      console.log(res);
      if (res.errorCode == 200) {

        this.employeeReport = res.getReportDetailsByEmployeeId
        // console.log(this.employeeReport);

      }
    })
  }

  deleteReport(item:any){
    console.log(item);
    
    let data = { "id": item.id}
    console.log(data);
    
    this._apiService.deleteReport(data).subscribe((res: any) => {
      console.log(res);
      if (res.errorCode == 200) {
        swal.fire({
          title: "Delete Successfully!",
          icon: "success"
        }).then((result:any) => {
          /* Read more about isConfirmed, isDenied below */
          
            this.openReport(this.selectedEmployeeDetail)
           
        });;
        // console.log(this.employeeReport);

      }
    })
  }


  open(content:any){
    this.modalVisible = true;
    this.modalRef = this.modalService.open(content, { size: 'xl' }); // Adjust 'lg' based on your modal size

      this.setupViewChild();

  }
  setupViewChild() {
    // Dynamically create ViewChild after modal is opened
    this.excelTable = new ElementRef(document.querySelector('#excelTable'));
  }
  close() {
    this.modalVisible = false;
    if (this.modalRef) {
      this.modalRef.close();
    }
  }


exportAsExcel() {
    const uri = 'data:application/vnd.ms-excel;base64,';
    const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>`;
    const base64 = function(s:any) { return window.btoa(unescape(encodeURIComponent(s))) };
    const format = function(s:any, c:any) { return s.replace(/{(\w+)}/g, function(m:any, p:any) { return c[p]; }) };
    const table = this.excelTable.nativeElement;
    const ctx = { worksheet: 'Worksheet', table: table.innerHTML };

    const link = document.createElement('a');
    link.download = `${this.selectedEmployeeDetail.employe_name}.xls`;
    link.href = uri + base64(format(template, ctx));
    link.click();
}
}
