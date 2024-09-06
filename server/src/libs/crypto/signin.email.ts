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
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
  หมายเลขบัตรประจำตัวประชาชน: ${citizenId}
  <a href="${process.env.BASE_URL as string}/signin/${signinToken}">login</a>
  </body>
  </html>`;
}
