import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // url: any = "http://localhost:8080"
  url: any = "https://innovatorautomation.onrender.com"
  constructor(private http: HttpClient) { }

  loginUser(data: any) {
    return this.http.post<any>(this.url + "/admin/getAdminDetails", data);
  }
  getAllEmployeeDetails(id:any){
    return this.http.get<any>(this.url + "/getAllEmployeeDetailByAdminId/"+id);
  }

  getAllEmployeeDetailsCount(id:any){
    return this.http.get<any>(this.url + "/sales/getAllEmployeeCounts");
  }
  getEmployeeReport(id:any){
    return this.http.get<any>(this.url + "/report/getReportDetailsByEmployeeId/"+id);
  }

  deleteReport(data:any){
    return this.http.post<any>(this.url + "/report/deleteReportDetailByEmployeeId",data);
  }
}
