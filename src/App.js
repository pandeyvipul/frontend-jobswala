import './App.css';
import { Companylogin } from './myComponent/Company/Companylogin';
import { Login } from './myComponent/Login';
import { Sidemenu } from './myComponent/Sidemenu';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Studentlogin } from './myComponent/Student/Studentlogin';
import Contact from './myComponent/Contact';
import About from './myComponent/About';
import Home from './myComponent/Home';
import { StudentForm } from './myComponent/Student/StudentForm';
import { CompanyForm } from './myComponent/Company/CompanyForm';
import Companysite from './myComponent/Company/Companysite'
import Studentsite from './myComponent/Student/Studentsite';
import CompanyInfo from './myComponent/Company/CompanyInfo';
import Companypayments from './myComponent/Company/Companypayments';
import Companyslot from './myComponent/Company/Companyslot';
import Companyothers from './myComponent/Company/Companyothers';
import Studentinfo from './myComponent/Student/Studentinfo';
import Studentpayments from './myComponent/Student/Studentpayments';
import Studentslot from './myComponent/Student/Studentslot';
import Studentcomplain from './myComponent/Student/Studentcomplain';
import Payment from './myComponent/Payment';
import Companyslotcreation from './myComponent/Company/Companyslotcreation';
import Companyslotdetails from './myComponent/Company/Companyslotdetails';
import Adminfrontpage from './myComponent/Admin/Adminfrontpage';
import AdminStudents from './myComponent/Admin/AdminStudents';
import AdminCompanys from './myComponent/Admin/AdminCompanys';
import CustomerService from './myComponent/Admin/CustomerService';
import Deactivation from './myComponent/Admin/Deactivation';
import Update from './myComponent/Update';




function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <div className="nav-bar">
      <Sidemenu />
      </div>
      <div className="main-content">
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/payment' element={<Payment />} />

          <Route path='/login/companys/register' element={<CompanyForm />} />
          <Route path='/login/students/register' element={<StudentForm />} /> 
          
          <Route path='/login/companys' element={<Companylogin />} />
          <Route path='/login/students' element={<Studentlogin />} />

          <Route path='/logged/companys' element={<Companysite />} />
          <Route path='/logged/companys/info' element={<CompanyInfo />} />
          <Route path='/logged/companys/payments' element={<Companypayments/>} />
          <Route path='/logged/companys/slot' element={<Companyslot />} />
          <Route path='/logged/companys/slot/create' element={<Companyslotcreation />} />
          <Route path='/logged/companys/slot/details' element={<Companyslotdetails />} />
          <Route path='/logged/companys/others' element={<Companyothers />} />


          <Route path='/logged/students' element={<Studentsite />} />
          <Route path='/logged/students/info' element={<Studentinfo/>} />
          <Route path='/logged/students/payments' element={<Studentpayments />} />
          <Route path='/logged/students/slot' element={<Studentslot />} />
          <Route path='/logged/students/others' element={<Studentcomplain />} />

          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path='/' element={<Home />} />

          <Route path='/admin' element={<Adminfrontpage/>} />
          <Route path='/admin/students' element={<AdminStudents/>} />
          <Route path='/admin/companies' element={<AdminCompanys/>} />
          <Route path='/admin/complaints' element={<CustomerService/>} />
          <Route path='/admin/deactivation' element={<Deactivation/>} />

          <Route path='/update' element={<Update/>} />

        </Routes>
        </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
