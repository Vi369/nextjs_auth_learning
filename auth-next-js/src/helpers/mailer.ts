import User from '@/models/user.model';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'
export  const sendEmail = async({email, emailType, userId}:any) =>{



    
    try {
        // uuid library ka use kar sakte hai special character ni aayenge 
        const hashedToken = await bcryptjs.hash(userId.toString(),10)

        console.log(emailType)
        if(emailType ==="VERIFY"){
            const updatetoke = await User.findByIdAndUpdate(userId, {
                $set:{
                    verifyToken: hashedToken,
                    verifyTokenExpiry: new Date(Date.now() + 3600000)
                }
            })
            console.log(updatetoke)
        } else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId, {
                $set:{
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: new Date(Date.now() + 3600000)
                }
            })
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "cb72ee18b247e7", // env variable me hona chahiye
              pass: "55c7704ba3ead8"
            }
          });
    
        const mailOptions = {
            from: 'freeEmail',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email": "Reset your password",
            html: `<p>
            Click <a href = "${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here to ${emailType ==="VERFIY"? "VERFIY YOUR EMAIL": "RESET YOUR PASSWORD"} or copy or paste the link below in browser.
            <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailResponce = await transport.sendMail(mailOptions)

        return mailOptions

    } catch (error:any) {
        throw new Error(error.message)
    }
}
