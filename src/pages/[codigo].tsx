import { useRouter } from 'next/router';

function CodigoPage() {
    const router = useRouter();
    const { codigo } = router.query;

    return (
        <div>
            <h1>Página de Código</h1>
            <p>Código recebido: {codigo}</p>
        </div>
    );
}

export default CodigoPage;
