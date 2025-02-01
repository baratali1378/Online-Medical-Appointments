import * as Yup from 'yup';
import validationMessages from '../../config/login.json';

interface LoginFormValues {
    email: string;
    password: string;
}

interface LoginFormResult {
    success: boolean;
    message?: string;
}

const useLoginForm = () => {
    const initialValues: LoginFormValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email(validationMessages.email.invalid)
            .required(validationMessages.email.required),
        password: Yup.string()
            .min(6, validationMessages.password.minLength)
            .required(validationMessages.password.required),
    });

    const handleSubmit = async (
        values: LoginFormValues
    ): Promise<LoginFormResult> => {
        try {
            // Simulate an API call (replace with actual API call)
            console.log('Login Submitted:', values);
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay

            // Return success result
            return { success: true, message: 'Login successful!' };
        } catch (error) {
            // Return error result
            return { success: false, message: 'Login failed. Please try again.' };
        }
    };

    return {
        initialValues,
        validationSchema,
        handleSubmit,
    };
};

export default useLoginForm;