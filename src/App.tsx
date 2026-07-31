import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout";
import { LoginPage } from "./pages/LoginPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ProjectFormPage } from "./pages/ProjectFormPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { RequirementPage } from "./pages/RequirementPage";
import { CalendarPage } from "./pages/CalendarPage";
import { AdminProductsPage } from "./pages/AdminProductsPage";
import { StatusSettingsPage } from "./pages/StatusSettingsPage";
import { RolesPage } from "./pages/RolesPage";
import { UsersPage } from "./pages/UsersPage";
import { useAuthStore } from "./stores/authStore";

function ProtectedLayout() {
  const user = useAuthStore((s) => s.user);
  return user ? <AppLayout /> : <Navigate to="/login" replace />;
}

export function App() {
  return <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route element={<ProtectedLayout />}>
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/new" element={<ProjectFormPage />} />
      <Route path="/projects/:id/edit" element={<ProjectFormPage />} />
      <Route path="/projects/:id" element={<ProjectDetailPage />} />
      <Route path="/projects/:id/requirements/new" element={<RequirementPage />} />
      <Route path="/projects/:id/requirements/:requirementId" element={<RequirementPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/admin/products" element={<AdminProductsPage />} />
      <Route path="/admin/status-settings" element={<StatusSettingsPage />} />
      <Route path="/admin/roles" element={<RolesPage />} />
      <Route path="/admin/users" element={<UsersPage />} />
    </Route>
    <Route path="*" element={<Navigate to="/projects" replace />} />
  </Routes>;
}
