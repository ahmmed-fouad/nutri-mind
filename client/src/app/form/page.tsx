"use client";
import { UserForm } from "@/components/forms";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useSelector } from "react-redux";
import { selectUserForm } from "@/stores/userFormApi";
import { RootState } from "@/stores";

export default function FormPage() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);
  const userId = user?.email || "";
  const userForm = useSelector((state: RootState) => selectUserForm(state.userForm, userId));

  if (!user) {
    return <div className="text-center mt-10 text-lg">Please log in to view your form.</div>;
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-4">User Information Form</h1>
      <UserForm userId={userId} initialValues={userForm} />
    </section>
  );
} 