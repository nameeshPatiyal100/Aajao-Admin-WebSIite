import { LoginLayout } from '../components/layout/loginLayout';
import { ResetPasswordForm } from "./Forms/ResetPasswordFrom"

export const ResetPassword = () => {
    return (
        <LoginLayout title="Verify Otp">
            <ResetPasswordForm />
        </LoginLayout>
    )
}