type Props = {
	name: string;
	url: string;
};

export function ResetPassword({ name, url }: Props) {
	return `
   <div>
        <h2>Olá ${name}</h2>
        <p>Você pediu alteração da sua senha!</p>

        <br />
        <p>Troque sua senha aqui: ${url}</p>
        <br />
   </div>
  
  `;
}
