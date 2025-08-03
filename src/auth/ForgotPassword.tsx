import { ForgetPasswordForm } from "./Forms/ForgotForm"
import { LoginLayout } from '../components/layout/loginLayout';

export const ForgotPassword = () => {
    return (
            <LoginLayout title="Forgot password">
                <ForgetPasswordForm/>
            </LoginLayout>
    )
}