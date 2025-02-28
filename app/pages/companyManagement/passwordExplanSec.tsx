"use client";
import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { useContext } from "react";

type params = {
    exist: boolean
    setExist: (value: boolean) => void
}
const PasswordExplanSec = ({exist, setExist}: params) => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;

    return (
        <div className={exist ? 'password-explan-sec' : 'invisible'} onClick={() => setExist(false)}>

            {activeLanguage?.language == 'arabic' ? 

                <section className="app-password-note">
                    <h3>📌 <strong>ملاحظة:</strong></h3>
                    <p>
                        هذه ليست <strong>كلمة المرور العادية</strong> لحساب <strong>Gmail</strong>، بل هي 
                        <strong>"كلمة مرور تطبيق"</strong> تُستخدم لإرسال رسائل التفعيل للعملاء.
                    </p>

                    <h4>🔹 <strong>طريقة الحصول على كلمة مرور التطبيق:</strong></h4>
                    <ol>
                        <li>انتقل إلى <a href="https://myaccount.google.com/security" target="_blank">صفحة أمان Google</a>.</li>
                        <li>قم بتفعيل <strong>التحقق بخطوتين</strong> إذا لم يكن مفعّلًا.</li>
                        <li>انتقل إلى <strong>إدارة كلمات مرور التطبيقات</strong>.</li>
                        <li>أنشئ <strong>كلمة مرور جديدة</strong> لخدمة البريد الإلكتروني، ثم <strong>انسخها وأدخلها هنا</strong>.</li>
                    </ol>

                    <p>✅ <strong>ملاحظة مهمة:</strong> لا تشارك هذه الكلمة مع أي شخص للحفاظ على أمان حساب البريد الإلكتروني.</p>
                </section>
            
            : <section className="app-password-note">
                <h3>📌 <strong>Note:</strong></h3>
                <p>
                    This is <strong>not</strong> your regular <strong>Gmail</strong> password; it is an 
                    <strong>"App Password"</strong> used to send activation emails to customers.
                </p>

                <h4>🔹 <strong>How to Get the App Password:</strong></h4>
                <ol>
                    <li>Go to the <a href="https://myaccount.google.com/security" target="_blank">Google Security Page</a>.</li>
                    <li>Enable <strong>Two-Step Verification</strong> if it’s not already enabled.</li>
                    <li>Visit <strong>App Passwords Management</strong>.</li>
                    <li>Generate a <strong>new password</strong> for the email service, then <strong>copy and enter it here</strong>.</li>
                </ol>

                <p>✅ <strong>Important Note:</strong> Do not share this password with anyone to keep your email account secure.</p>
            </section>
            }

        </div>
    )
}
export default PasswordExplanSec;