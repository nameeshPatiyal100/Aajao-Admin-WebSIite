import { LoginLayout } from '../components/layout/loginLayout';
import { VerifyOtpForm } from "./Forms/OtpForm"

export const VerifyOtp = () => {
    return (
            <LoginLayout title="Verify Otp">
                <VerifyOtpForm/>
            </LoginLayout>
    )
}