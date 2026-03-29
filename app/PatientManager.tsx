import React, { useState } from 'react';
import { Patient } from './updatePeopT';
import { UpdatePatientData } from './updatePeop';

export function PatientManager() {
  const [searchId, setSearchId] = useState("");
  const [activePatient, setActivePatient] = useState<Patient | null>(null);
  const [newAttrName, setNewAttrName] = useState("");
  const [newAttrValue, setNewAttrValue] = useState("");
  
  const [showConfirm, setShowConfirm] = useState(false);
  const [showType, setShowType] = useState(false);

  const handleSearch = async () => {
    // In a real app, you might fetch this from the server. 
    // For now, we search the local state if already loaded or re-fetch.
    alert("Search logic triggered for ID: " + searchId);
  };

  const handlePlusClick = () => {
    if (!activePatient) return;
    if (activePatient[newAttrName] !== undefined) {
      executeSave(newAttrName, newAttrValue);
    } else {
      setShowConfirm(true);
    }
  };

  const executeSave = async (name: string, value: string, type?: 'num' | 'word') => {
    let finalValue: any = value;
    if (type === 'num' || typeof activePatient![name] === 'number') {
      finalValue = Number(value);
    }

    try {
      const updated = await UpdatePatientData(activePatient!.id, { [name]: finalValue });
      setActivePatient(updated);
      setNewAttrName("");
      setNewAttrValue("");
      setShowConfirm(false);
      setShowType(false);
    } catch (e) {
      alert("Error saving data.");
    }
  };

  return (
    <div style={{ display: 'flex', padding: '20px' }}>
      <div style={{ flex: 1 }}>
        <input placeholder="ID" value={searchId} onChange={e => setSearchId(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
        <hr />
        <button onClick={handlePlusClick}>+</button>
        <input placeholder="Attribute" value={newAttrName} onChange={e => setNewAttrName(e.target.value)} />
        <input placeholder="Value" value={newAttrValue} onChange={e => setNewAttrValue(e.target.value)} />

        {showConfirm && (
          <div>
            <p>Create new attribute?</p>
            <button onClick={() => setShowType(true)}>Yes</button>
            <button onClick={() => setShowConfirm(false)}>No</button>
          </div>
        )}

        {showType && (
          <div>
            <p>Select Type:</p>
            <button onClick={() => executeSave(newAttrName, newAttrValue, 'num')}>num</button>
            <button onClick={() => executeSave(newAttrName, newAttrValue, 'word')}>word</button>
          </div>
        )}
      </div>

      <div style={{ flex: 1, borderLeft: '1px solid black', paddingLeft: '20px' }}>
        <pre>{JSON.stringify(activePatient, null, 2)}</pre>
      </div>
    </div>
  );
}