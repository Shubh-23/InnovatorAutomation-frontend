
import { Component, OnInit } from '@angular/core';
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
export class DashboardComponent implements OnInit {
  employeeReport: any = []
  selectedEmployeeDetail:any={}
  modalRef: any;

  constructor(private _apiService: ApiService,private modalService:NgbModal,private datePipe: DatePipe) { }
  adminId: any
  employeeDetails: any = []
  ngOnInit(): void {
    this.adminId = localStorage.getItem('adminId')
    this.getAllEmployeeDetails()
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
    this.modalRef = this.modalService.open(content, { size: 'xl' }); // Adjust 'lg' based on your modal size
  }
  close() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }
}
