import { Component, OnInit } from '@angular/core';
import { Employee } from './models/Employee';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Assignment proj.';

  employee: any = {};
  employees: Employee[] = [];
  isEmpUpdate: boolean = false;
  isUpdateKey!: string;

  constructor(private localStorageService: LocalStorageService) {

  }

  // component life cycle hook method to get the employees.
  ngOnInit(): void {
    this.getAllEmployees();
  }

  // save or update the employee
  onSubmit(employeeRegistrationForm: any) {
    // getting the employee data from the form.
    let employee = employeeRegistrationForm.value;


    let emp: Employee = {
      name: employee.empName,
      salary: employee.empSalary,
      id: this.localStorageService.isKeyExist(this.isUpdateKey) ? this.isUpdateKey : this.generateUniqueId(),
      designation: employee.empDesignation,
      mobile: employee.empMobile,
      qualification: employee.empQualification,
      manager: employee.empManager,
      email: employee.empEmail
    }

    this.localStorageService.setItem(emp.id, JSON.stringify(emp));

    // reset the form.
    employeeRegistrationForm.resetForm();

    // get the employees.
    this.getAllEmployees();

    // temp flags for update process.
    this.isEmpUpdate = false;
    this.isUpdateKey = "";
  }

  // generate unique id for each employee.
  generateUniqueId(): string {
    return Math.random().toString().replace("0.", "")
  }

  // fetch all the employee from local storage.
  getAllEmployees() {
    var values = [];
    let keys = Object.keys(localStorage),
    i = keys.length;

    while (i--) {
      values.push(JSON.parse(localStorage.getItem(keys[i])!));
    }
    this.employees = [...values]
  }

  // to reset the form.
  resetForm(form: any) {
    form.reset();
  }

  // delete the employee by using employee id.
  deleteEmployee(id: any) {
    this.localStorageService.deleteItem(id);
    this.getAllEmployees();
  }


  // edit the employee by using employee id.
  editEmployee(id: any) {
    Object.assign(this.employee, JSON.parse(this.localStorageService.getItem(id)!));
    this.isEmpUpdate = true;
    let j = (JSON.parse(this.localStorageService.getItem(id)!));
    this.isUpdateKey = j.id;
  }
}


