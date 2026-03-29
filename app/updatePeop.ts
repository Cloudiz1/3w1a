import { Patient } from './types';

/**
 * Sends the update to the Node.js server to modify patients.json
 */
export async function UpdatePatientData(patientId: number, updates: Partial<Patient>): Promise<Patient> {
    const response = await fetch('http://localhost:5000/api/update-patient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientId, updates })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update");
    }

    return await response.json();
}
