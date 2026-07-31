import { Navigate, useNavigate } from "react-router-dom";
import { BriefcaseBusiness, LogIn } from "lucide-react";
import { Button } from "../components/ui";
import { useAuthStore } from "../stores/authStore";

export function LoginPage() {
  const navigate = useNavigate(); const { user, login } = useAuthStore();
  if (user) return <Navigate to="/projects" replace />;
  return <main className="grid min-h-screen place-items-center bg-slate-50 p-5"><section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-[0_20px_70px_rgba(24,144,255,0.10)] sm:p-10"><div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200"><BriefcaseBusiness size={28} /></div><h1 className="text-2xl font-bold text-slate-950">專案管理平台</h1><p className="mt-2 text-sm text-slate-500">請使用公司 Google 帳號登入</p><Button className="mt-8 w-full" onClick={() => { login(); navigate("/projects"); }}><LogIn size={18} />使用 Google 登入</Button><p className="mt-5 text-xs leading-5 text-slate-400">登入即表示您同意遵守公司資訊安全規範</p></section></main>;
}
