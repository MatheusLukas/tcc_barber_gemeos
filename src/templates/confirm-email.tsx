type Props = {
	name: string;
	url: string;
};

export function sendEmailConfirmation({ name, url }: Props) {
	return `
   <div>
        <h2>Olá ${name}</h2>
        <p>Você criou uma conta no website da gemeos barbers</p>

        <br />
        <p>Confirme seu email clicando aqui ${url}</p>
        <br />
        <p>Você será logado automaticamente!</p>
   </div>
  
  `;
}
