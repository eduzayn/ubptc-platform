import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserProfile from "./UserProfile";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import DocumentUploadForm from "./DocumentUploadForm";
import DocumentsArchive from "./DocumentsArchive";
import PaymentStatus from "./PaymentStatus";
import MyCourses from "./MyCourses";
import ProfileSettings from "./ProfileSettings";
import DigitalCredentials from "./DigitalCredentials";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Interfaces
interface UserData {
  id: string;
  name: string;
  email: string;
  cpf: string;
  profession: string;
  institution: string;
  graduationYear: string;
  specialization: string;
  memberSince: string;
  memberId: string;
  paymentStatus: 'active' | 'suspended' | 'pending';
  avatarUrl?: string;
}

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: string;
}

interface PhotoUploadEvent extends CustomEvent {
  detail: {
    photoUrl: string;
  };
}

declare global {
  interface WindowEventMap {
    'photo3x4Uploaded': PhotoUploadEvent;
  }
}

const ProfilePage: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeTab, setActiveTab] = useState("personal");
  const [documentsComplete, setDocumentsComplete] = useState(false);
  const [userPhotoUrl, setUserPhotoUrl] = useState<string | undefined>(
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
  );

  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    }

    if (location.pathname.includes("/my-courses")) {
      setActiveTab("my-courses");
    }
  }, [location]);

  const handleDocumentsComplete = (complete: boolean) => {
    setDocumentsComplete(complete);
  };

  useEffect(() => {
    const handlePhotoUpload = (event: PhotoUploadEvent) => {
      const { photoUrl } = event.detail;
      setUserPhotoUrl(photoUrl);
    };

    window.addEventListener("photo3x4Uploaded", handlePhotoUpload);

    return () => {
      window.removeEventListener("photo3x4Uploaded", handlePhotoUpload);
    };
  }, []);

  const userData: UserData = {
    id: "123456",
    name: "Maria Silva",
    email: "maria.silva@email.com",
    cpf: "123.456.789-00",
    profession: "Psicóloga",
    institution: "Universidade Federal",
    graduationYear: "2018",
    specialization: "Psicanálise",
    memberSince: "15 de Janeiro, 2023",
    memberId: "UBPTC-2023-7845",
    paymentStatus: "active",
    avatarUrl: userPhotoUrl,
  };

  const invoices: Invoice[] = [
    {
      id: "INV-001",
      date: "15/06/2023",
      amount: "R$ 49,90",
      status: "Pago",
    },
    {
      id: "INV-002",
      date: "15/05/2023",
      amount: "R$ 49,90",
      status: "Pago",
    },
    {
      id: "INV-003",
      date: "15/04/2023",
      amount: "R$ 49,90",
      status: "Pago",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col h-screen">
        <Navbar
          onMenuToggle={toggleSidebar}
          username="Maria Silva"
          avatarUrl={userPhotoUrl}
          notificationCount={5}
          isAdmin={true}
        />

        <div className="flex flex-1 overflow-hidden">
          <div
            className={`${showSidebar ? "block" : "hidden"} md:block flex-shrink-0`}
          >
            <Sidebar />
          </div>

          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="personal">Perfil</TabsTrigger>
                  <TabsTrigger value="my-courses">Meus Cursos</TabsTrigger>
                  <TabsTrigger value="documents">Documentos</TabsTrigger>
                  <TabsTrigger value="credentials">Credenciais</TabsTrigger>
                  <TabsTrigger value="payment">Pagamento</TabsTrigger>
                  <TabsTrigger value="settings">Configurações</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="mt-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                      <UserProfile userData={userData} onBack={handleBack} />
                    </div>
                    <div className="lg:col-span-2">
                      <DocumentUploadForm
                        onDocumentsComplete={handleDocumentsComplete}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="my-courses" className="mt-6">
                  <MyCourses />
                </TabsContent>

                <TabsContent value="documents" className="mt-6">
                  <DocumentsArchive />
                </TabsContent>

                <TabsContent value="credentials" className="mt-6">
                  <DigitalCredentials
                    userData={userData}
                    paymentConfirmed={true}
                    documentationComplete={documentsComplete}
                  />
                </TabsContent>

                <TabsContent value="payment" className="mt-6">
                  <PaymentStatus
                    plan="Profissional"
                    status="active"
                    nextBilling="15/07/2023"
                    amount="R$ 49,90"
                    paymentMethod="Cartão de crédito terminando em 4242"
                    invoices={invoices}
                  />
                </TabsContent>

                <TabsContent value="settings" className="mt-6">
                  <ProfileSettings />
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
