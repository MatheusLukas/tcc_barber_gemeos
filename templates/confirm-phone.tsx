type Props = {
	phoneNumber: string;
	code: string;
};

export function sendPhoneConfirmation({ phoneNumber, code }: Props) {
	return `
   <div>
        <h2>Olá ${phoneNumber}</h2>
        <p>Você criou uma conta no website da gemeos barbers</p>

        <br />
        <p>Confirme seu email clicando aqui ${code}</p>
        <br />
        <p>Você será logado automaticamente!</p>
   </div>
  
  `;
}
