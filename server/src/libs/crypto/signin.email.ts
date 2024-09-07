export default function SignInEmail({
  citizenId,
  signinToken,
}: {
  citizenId: string;
  signinToken: string;
}) {
  return `
  <!DOCTYPE html>
  <html lang="en">

  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to SIMC25th</title>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@100;200;300;400;500;600;700&display=swap">
  </head>

  <body style="font-family: 'IBM Plex Sans Thai', sans-serif; background-color: #100f31; color: #fcfbfb; margin: 0; padding: 0;">
      <div style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #7dc5e9; color: #ffffff; text-align: center; padding: 20px;">
              <h1 style="margin: 0;">Welcome to SIMC 25th</h1>
          </div>
          <div style="padding: 30px; text-align: center; background-color: #211f4a;">
              <p style="font-size: 16px;">ลิงก์เข้าเว็บไซต์สำหรับ: ${citizenId}</p>
              <p style="font-size: 16px;">น้องสามารถเข้าสู่เว็บไซต์ได้โดยการกดปุ่มด้านล่างนี้เลย</p>
              <a href="${
                process.env.BASE_URL as string
              }/signin/${signinToken}" style="display: inline-block; padding: 15px 25px; margin-bottom: 20px; background-color: #7dc5e9; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 18px;">Sign In</a>
              <p style="font-size: 16px;">ลิงก์เข้าเว็บไซต์จากอีเมลนี้จะมีอายุ 7 วัน เมื่อถึงวันหมดอายุให้น้องๆ ทำการเข้าลิงก์เดิมอีก 1 รอบแล้วระบบจะส่งอีเมลใหม่ไปให้โดยอัตโนมัติ</p>
          </div>
          <div style=" background-color: #211f4a; color: #fcfbfb; text-align: center; padding: 20px; font-size: 14px;">
              <p style="margin: 0;">SIMC 25th</p>
              <p style="margin: 10px 0;">ติดตามพวกเราได้ที่:</p>
              <p style="margin: 0;">
                  <a href="https://www.facebook.com/sirirajmedcamp25th" style="color: #22c2d0; text-decoration: none;">Facebook</a> |
                  <a href="https://www.instagram.com/sirirajmedcamp25th" style="color: #22c2d0; text-decoration: none;">Instagram</a> |
                  <a href="https://www.tiktok.com/@sirirajmedicalcamp" style="color: #22c2d0; text-decoration: none;">TikTok</a> |
                  <a href="${
                    process.env.BASE_URL as string
                  }" style="color: #22c2d0; text-decoration: none;">Website</a>
              </p>
          </div>
      </div>
  </body>

  </html>
  `;
}
