import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

/* ===================== MAIN ===================== */
import MainPage from "./Pages/Mainpage";
import Auth from "./Pages/Auth/Auth";
import PaymentPage from "./Pages/Payment/PaymentPage";
import PaymentResultPage from "./Pages/Payment/PaymentResultPage";
import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminDashboard from "./Pages/Admin/AdminDashboard";

/* ===================== DONATION ===================== */
import DonationPage from "./Pages/Donation/DonationPage";
import DonationSuccessPage from "./Pages/Donation/DonationSuccessPage";
import DonationFailurePage from "./Pages/Donation/DonationFailurePage";

/* ===================== CONSULTANCY SERVICES ===================== */
import ConsultancyServices from "./Pages/OurPrograms/Consultancy_Services/ConsultancyServices";
import ExpertConsultancyServices from "./Pages/OurPrograms/Consultancy_Services/ExpertConsultancyServices";
import LogisticSupportServices from "./Pages/OurPrograms/Consultancy_Services/LogisticSupportServices";
import ConferenceSupportServices from "./Pages/OurPrograms/Consultancy_Services/ConferenceSupportServices";

/* ===================== CAPABILITY PAGES ===================== */
import ArtificialIntelligence from "./Pages/OurPrograms/Capability/ArtificialIntelligence";
import BusinessIntelligence from "./Pages/OurPrograms/Capability/BusinessIntelligence";
import Bioinformatics from "./Pages/OurPrograms/Capability/Bioinformatics";
import ComputationalMathematics from "./Pages/OurPrograms/Capability/ComputationalMathematics";
import DataAnalytics from "./Pages/OurPrograms/Capability/DataAnalytics";
import QuantumComputing from "./Pages/OurPrograms/Capability/QuantumComputing";

/* ===================== RESEARCH & IDEAS - BLOGS ===================== */
import AiMachineLearning from "./Pages/Research&Ideas/Blogs/Ai&Machinelearning";
import DataScience from "./Pages/Research&Ideas/Blogs/Datascience";
import STEMEducation from "./Pages/Research&Ideas/Blogs/STEMEducation";

/* ===================== ABOUT THE FOUNDATION - CIRCLE ===================== */
import Individual from "./Pages/About_The_Foundation/MathTechCircle/Individual";
import Institutional from "./Pages/About_The_Foundation/MathTechCircle/Institutional";

/* ===================== ABOUT THE FOUNDATION - MATH TECH CIRCLE ===================== */
import StudentChapter from "./Pages/About_The_Foundation/chapters/StudentChapter";
import AboutStudentChapter from "./Pages/About_The_Foundation/chapters/AboutStudentChapter";

/* ===================== AWARDS ===================== */
import Awards2025 from "./Pages/OurPrograms/Awards/Awards2025";
import Awards2024 from "./Pages/OurPrograms/Awards/Awards2024";
import MembersPage from "./Pages/Members/MembersPage";
/* ===================== CONTACT ===================== */
import Contact from "./Pages/Contacts/Contact";

/* ===================== ABOUT THE FOUNDATION - OUR ORGANISATION ===================== */
import Advisors from "./Pages/About_The_Foundation/OurOrganisation/Advisors";
import Leaders from "./Pages/About_The_Foundation/OurOrganisation/Leaders";
import Executives from "./Pages/About_The_Foundation/OurOrganisation/Executives";
import Mentors from "./Pages/About_The_Foundation/OurOrganisation/Mentors";
import TechnicalTeam from "./Pages/About_The_Foundation/OurOrganisation/TechnicalTeam";

/* ===================== ABOUT THE FOUNDATION - MTTF ABOUT ===================== */
import About from "./Pages/About_The_Foundation/MTTF_About/About";
import MTTFContact from "./Pages/About_The_Foundation/MTTF_About/MTTFContact";

function App() {
  return (
    <Router>
      <Routes>

        {/* ===================== HOME ===================== */}
        <Route path="/" element={<MainPage />} />

        {/* ===================== PROGRAMS LANDING ===================== */}
        {/* Used when user clicks "Our Programs" main button */}
        <Route
          path="/programs"
          element={<Navigate to="/programs/consultancy-services" replace />}
        />
        {/*===================== AUTH ======================*/}
          <Route path="/auth" element={<Auth />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment/status" element={<PaymentResultPage />} />
          <Route path="/payment/success" element={<PaymentResultPage fallbackStatus="success" />} />
          <Route path="/payment/failure" element={<PaymentResultPage fallbackStatus="failure" />} />

        {/*===================== DONATION ======================*/}
          <Route path="/donate" element={<DonationPage />} />
          <Route path="/donate/success" element={<DonationSuccessPage />} />
          <Route path="/donate/failure" element={<DonationFailurePage />} />

        {/*===================== ADMIN (Hidden) ======================*/}
          <Route path="/mttf-admin-2025" element={<AdminLogin />} />
          <Route path="/mttf-admin-2025/dashboard" element={<AdminDashboard />} />

        {/* ===================== CONSULTANCY SERVICES ===================== */}
        <Route
          path="/programs/consultancy-services"
          element={<ConsultancyServices />}
        />
        <Route
          path="/programs/consultancy-services/expert-consultancy"
          element={<ExpertConsultancyServices />}
        />
        <Route
          path="/programs/consultancy-services/logistic-support"
          element={<LogisticSupportServices />}
        />
        <Route
          path="/programs/consultancy-services/conference-support"
          element={<ConferenceSupportServices />}
        />

        {/* ===================== CAPABILITY ===================== */}
        <Route
          path="/programs/capability/artificial-intelligence"
          element={<ArtificialIntelligence />}
        />
        <Route
          path="/programs/capability/business-intelligence"
          element={<BusinessIntelligence />}
        />
        <Route
          path="/programs/capability/bioinformatics"
          element={<Bioinformatics />}
        />
        <Route
          path="/programs/capability/computational-mathematics"
          element={<ComputationalMathematics />}
        />
        <Route
          path="/programs/capability/data-analytics"
          element={<DataAnalytics />}
        />
        <Route
          path="/programs/capability/quantum-computing"
          element={<QuantumComputing />}
        />
        {/* ===================== RESEARCH & IDEAS - BLOGS ===================== */}
<Route path="/blogs/ai-ml" element={<AiMachineLearning />} />
<Route path="/blogs/data-science" element={<DataScience />} />
<Route path="/blogs/education" element={<STEMEducation />} />

        {/* ===================== AWARDS ===================== */}
        <Route path="/programs/awards/2025" element={<Awards2025 />} />
        <Route path="/programs/awards/2024" element={<Awards2024 />} />

        {/* ===================== CONTACT ===================== */}
        <Route path="/contact" element={<Contact />} />

        {/* ===================== ABOUT THE FOUNDATION - OUR ORGANISATION ===================== */}
        <Route path="/about/organisation/advisors" element={<Advisors />} />
        <Route path="/about/organisation/leaders" element={<Leaders />} />
        <Route path="/about/organisation/executives" element={<Executives />} />
        <Route path="/about/organisation/mentors" element={<Mentors />} />
        <Route path="/about/organisation/technical-team" element={<TechnicalTeam />} />

        {/* ===================== ABOUT THE FOUNDATION - MTTF ABOUT ===================== */}
        <Route path="/about/mttf/about" element={<About />} />
        <Route path="/about/mttf/contact" element={<MTTFContact />} />

       {/* ===================== ABOUT THE FOUNDATION - MATH TECH CIRCLE ===================== */}
<Route path="/about/mathtech/individual" element={<Individual />} />
<Route path="/about/mathtech/institutional" element={<Institutional />} />
<Route path="/members" element={<MembersPage />} />


{/* ===================== ABOUT THE FOUNDATION - MATH TECH CIRCLE ===================== */}
<Route path="/about/mathtech/student-chapter" element={<StudentChapter />} />
<Route path="/about/mathtech/about-chapter" element={<AboutStudentChapter />} />

        {/* ===================== ABOUT THE FOUNDATION - MAIN ===================== */}
        {/* Redirect /about to the first organisation page */}
        <Route path="/about" element={<Navigate to="/about/organisation/advisors" replace />} />

        {/* ===================== FALLBACK ===================== */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}

export default App;
