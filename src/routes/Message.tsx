import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IMessage } from "../@Types/productType";
import { sendMessage } from "../services/message-service";
import dialogs from "../ui/dialogs";
import patterns from "../validations/patterns";

const Message = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<IMessage>({
        defaultValues: { fullName: "", email: "", phone: "", message: "" },
        mode: "onChange",
    });

    const onSend = (data: IMessage) => {
        console.log("Send data:", data);
        sendMessage(data)
            .then(() => {
                dialogs.success("Message Sent", "Your message has been sent successfully.");
                navigate("/");
            })
            .catch((error) => {
                dialogs.error("Message Error", error.response.data);
            });
    };

    return (
        <div className="create-card-container bg-[#3c2a1d] text-white dark:bg-slate-600">
            <form noValidate onSubmit={handleSubmit(onSend)}>
                {/* Full Name */}
                <section>
                    <input
                        placeholder="Full Name"
                        type="text"
                        {...register("fullName", {
                            required: "This field is mandatory",
                            minLength: { value: 2, message: "Too short" },
                            maxLength: { value: 255, message: "Too long" },
                        })}
                    />
                    {errors.fullName && (
                        <p className="text-red-500">{errors.fullName?.message}</p>
                    )}
                </section>

                {/* Phone */}
                <section>
                    <input
                        placeholder="Phone"
                        type="tel"
                        {...register("phone", {
                            required: "This field is mandatory",
                            pattern: {
                                value: patterns.phone,
                                message: "Invalid phone number",
                            },
                        })}
                    />
                    {errors.phone && (
                        <p className="text-red-500">{errors.phone?.message}</p>
                    )}
                </section>

                {/* Email */}
                <section>
                    <input
                        placeholder="Email"
                        type="email"
                        {...register("email", {
                            required: "This field is mandatory",
                            pattern: {
                                value: patterns.email,
                                message: "Invalid email",
                            },
                        })}
                    />
                    {errors.email && (
                        <p className="text-red-500">{errors.email?.message}</p>
                    )}
                </section>

                {/* Message */}
                <section>
                    <textarea
                        placeholder="Message"
                        {...register("message", {
                            required: "This field is mandatory",
                            minLength: { value: 5, message: "Too short" },
                            maxLength: { value: 500, message: "Too long" },
                        })}
                    />
                    {errors.message && (
                        <p className="text-red-500">{errors.message?.message}</p>
                    )}
                </section>

                <button disabled={!isValid} type="submit">Send</button>
            </form>
        </div>
    );
};

export default Message;
