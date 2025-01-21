import React, { useEffect, useState } from 'react';

// Definisikan tipe untuk attachment
interface Attachment {
    id: string;
    project_id: number;
    name: string;
    path: string;
    download_link: string;
    size: number;
    type: string;
    created_at: string;
}

const HumanRightsAttachment: React.FC = () => {
    const [attachment, setAttachment] = useState<Attachment | null>(null);
    const token = localStorage.getItem('token');

    // Fetch data saat komponen dimount
    useEffect(() => {
        const fetchAttachment = async () => {
            try {
                const response = await fetch('https://alobro.my.id/api/v1/esg/human-rights-attachment?project_id=1', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch attachment data');
                }

                const result = await response.json();
                setAttachment(result.data); // Simpan data attachment ke state
            } catch (error) {
                console.error('Error fetching attachment:', error);
            }
        };

        fetchAttachment();
    }, [token]);

    const handleDownload = async () => {
        if (!attachment) return;

        try {
            const response = await fetch(attachment.download_link, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to download file');
            }

            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            // Buat elemen `<a>` untuk memulai download
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = attachment.name; // Nama file dari API
            document.body.appendChild(a);
            a.click();
            a.remove();

            // Bersihkan URL Blob setelah selesai
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    return (
        <div>
            <h1>Human Rights Attachment</h1>
            {attachment ? (
                <button onClick={handleDownload}>
                    Download {attachment.name}
                </button>
            ) : (
                <p>Loading attachment...</p>
            )}
        </div>
    );
};

export default HumanRightsAttachment;
