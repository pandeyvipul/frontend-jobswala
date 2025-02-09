import './App.css';
import { lazy , Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import { Companylogin } from './myComponent/Company/Companylogin';
// import { Login } from './myComponent/Login';
// import { Sidemenu } from './myComponent/Sidemenu';
// import { Studentlogin } from './myComponent/Student/Studentlogin';
// import Contact from './myComponent/Contact';
// import About from './myComponent/About';
// import Home from './myComponent/Home';
// import { StudentForm } from './myComponent/Student/StudentForm';
// import { CompanyForm } from './myComponent/Company/CompanyForm';
// import Companysite from './myComponent/Company/Companysite'
// import Studentsite from './myComponent/Student/Studentsite';
// import CompanyInfo from './myComponent/Company/CompanyInfo';
// import Companypayments from './myComponent/Company/Companypayments';
// import Companyslot from './myComponent/Company/Companyslot';
// import Companyothers from './myComponent/Company/Companyothers';
// import Studentinfo from './myComponent/Student/Studentinfo';
// import Studentpayments from './myComponent/Student/Studentpayments';
// import Studentslot from './myComponent/Student/Studentslot';
// import Studentcomplain from './myComponent/Student/Studentcomplain';
// import Payment from './myComponent/Payment';
// import Companyslotcreation from './myComponent/Company/Companyslotcreation';
// import Companyslotdetails from './myComponent/Company/Companyslotdetails';
// import Adminfrontpage from './myComponent/Admin/Adminfrontpage';
// import AdminStudents from './myComponent/Admin/AdminStudents';
// import AdminCompanys from './myComponent/Admin/AdminCompanys';
// import CustomerService from './myComponent/Admin/CustomerService';
// import Deactivation from './myComponent/Admin/Deactivation';
// import Update from './myComponent/Update';
const Contact = lazy(() => import('./myComponent/Contact'));
const About = lazy(() => import('./myComponent/About'));
const Home = lazy(() => import('./myComponent/Home'));
const StudentForm = lazy(() => import('./myComponent/Student/StudentForm'));
const CompanyForm = lazy(() => import('./myComponent/Company/CompanyForm'));
const Companysite = lazy(() => import('./myComponent/Company/Companysite'));
const Studentsite = lazy(() => import('./myComponent/Student/Studentsite'));
const CompanyInfo = lazy(() => import('./myComponent/Company/CompanyInfo'));
const Companypayments = lazy(() => import('./myComponent/Company/Companypayments'));
const Companyslot = lazy(() => import('./myComponent/Company/Companyslot'));
const Companyothers = lazy(() => import('./myComponent/Company/Companyothers'));
const Studentinfo = lazy(() => import('./myComponent/Student/Studentinfo'));
const Studentpayments = lazy(() => import('./myComponent/Student/Studentpayments'));
const Studentslot = lazy(() => import('./myComponent/Student/Studentslot'));
const Studentcomplain = lazy(() => import('./myComponent/Student/Studentcomplain'));
const Payment = lazy(() => import('./myComponent/Payment'));
const Companyslotcreation = lazy(() => import('./myComponent/Company/Companyslotcreation'));
const Companyslotdetails = lazy(() => import('./myComponent/Company/Companyslotdetails'));
const Adminfrontpage = lazy(() => import('./myComponent/Admin/Adminfrontpage'));
const AdminStudents = lazy(() => import('./myComponent/Admin/AdminStudents'));
const AdminCompanys = lazy(() => import('./myComponent/Admin/AdminCompanys'));
const CustomerService = lazy(() => import('./myComponent/Admin/CustomerService'));
const Deactivation = lazy(() => import('./myComponent/Admin/Deactivation'));
const Update = lazy(() => import('./myComponent/Update'));
const Companylogin = lazy(() => import('./myComponent/Company/Companylogin'));
const Login = lazy(() => import('./myComponent/Login'));
const Sidemenu = lazy(() => import('./myComponent/Sidemenu'));
const Studentlogin = lazy(() => import('./myComponent/Student/Studentlogin'));




function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <div className="nav-bar">
      <Sidemenu />
      </div>
      <div className="main-content">
          <Suspense fallback={<div>Loading...</div>}>
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
          </Suspense>

        </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
