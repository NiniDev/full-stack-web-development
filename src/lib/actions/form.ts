export const enhance = (form: HTMLFormElement, { result }) => {

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        
        try {
            const body = new FormData(form);
            const res = await fetch(form.action, {
                method: form.method,
                body,
                headers: {
                    'accept': 'application/json',
                }
            });
            if (res.ok) {
                result(res, form);
            } else {
                console.log('error', await res.text());  
            }
        } catch (error) {
            console.error("Fetch error: ", error);
        }
    }

    form.addEventListener('submit', handleSubmit);

    return {
        destroy() {
            form.removeEventListener('submit', handleSubmit);
        }
    }
}