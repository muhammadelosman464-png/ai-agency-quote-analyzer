"use server";

import { createClient } from "@supabase/supabase-js";

export async function submitProject(formData: FormData) {
  const client_name = formData.get("client_name")?.toString().trim() || "";
  const phone = formData.get("phone")?.toString().trim() || "";
  const project_idea = formData.get("project_idea")?.toString().trim() || "";

  if (!client_name || !phone || !project_idea) {
    return { error: "يرجى ملء كافة الحقول المطلوبة." };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;

  if (!supabaseUrl || !supabaseAnonKey) {
    return { error: "إعدادات Supabase غير متوفرة في بيئة العمل." };
  }

  if (!n8nWebhookUrl) {
    return { error: "رابط n8n Webhook غير متوفر في بيئة العمل." };
  }

  const projectData = {
    client_name,
    phone,
    project_idea,
  };

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const [supabaseResponse, webhookResponse] = await Promise.all([
      supabase.from("project_requests").insert([projectData]),
      fetch(n8nWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "bypass-tunnel-reminder": "true",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(projectData),
      }),
    ]);

    if (supabaseResponse.error) {
      console.error("Supabase Insert Error:", supabaseResponse.error);
      return { error: supabaseResponse.error.message || "فشل حفظ البيانات في قاعدة البيانات." };
    }

    if (!webhookResponse.ok) {
      console.error("Webhook Response Error:", webhookResponse.status, webhookResponse.statusText);
      return { error: `فشل إرسال الطلب إلى خادم n8n (رمز الحالة: ${webhookResponse.status}).` };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Unexpected Error in submitProject:", err);
    return { error: err?.message || "حدث خطأ غير متوقع أثناء معالجة الطلب." };
  }
}
