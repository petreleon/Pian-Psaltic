import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, ExternalLink } from 'lucide-react';

export const TermsModal: React.FC = () => {
    // Initialize directly from localStorage to avoid flash of content or effect timing issues
    const [isOpen, setIsOpen] = useState(() => {
        const accepted = localStorage.getItem('pian_psaltic_terms_accepted_v2');
        return !accepted;
    });

    const handleAccept = () => {
        localStorage.setItem('pian_psaltic_terms_accepted_v2', 'true');
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-stone-900 border border-stone-700 rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl">

                {/* Header */}
                <div className="p-6 border-b border-stone-800 flex items-center gap-3">
                    <ShieldCheck className="text-yellow-500" size={32} />
                    <h2 className="text-2xl font-byzantine text-yellow-100">Termeni și Condiții de Utilizare</h2>
                </div>

                {/* Scrollable Content */}
                <div className="p-6 overflow-y-auto text-stone-300 space-y-6 text-sm leading-relaxed custom-scrollbar">

                    <p>
                        Bine ați venit la <strong>Pian Psaltic</strong> ("Aplicația").
                        Vă rugăm să citiți cu atenție termenii și condițiile de mai jos înainte de a utiliza această aplicație.
                        Prin continuarea utilizării, sunteți de acord cu acești termeni.
                    </p>

                    <div className="bg-stone-800/50 p-4 rounded border border-stone-700">
                        <h3 className="text-lg font-bold text-yellow-500 mb-2 flex items-center gap-2">
                            <Lock size={18} />
                            Model de Licențiere Duală
                        </h3>
                        <p className="mb-2">
                            Această aplicație este distribuită sub un model de licențiere duală.
                            În funcție de modul în care intenționați să utilizați aplicația, se aplică una dintre următoarele licențe:
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-1">1. Licență Open Source (AGPL v3)</h4>
                        <p>
                            Pentru utilizare personală, educațională, non-comercială sau în proiecte open-source compatibile,
                            codul sursă al acestei aplicații este disponibil sub licența <strong>GNU Affero General Public License v3 (AGPL)</strong>.
                        </p>
                        <ul className="list-disc list-inside mt-2 pl-2 space-y-1 text-stone-400">
                            <li>Aveți libertatea de a utiliza, modifica și redistribui codul.</li>
                            <li>Dacă oferiți acces la o versiune modificată prin rețea, trebuie să oferiți și codul sursă complet sub aceeași licență.</li>
                            <li>Această licență asigură că aplicația rămâne liberă și deschisă comunității.</li>
                        </ul>
                        <a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-400 text-xs inline-flex items-center gap-1 mt-2">
                            Citește textul complet AGPL <ExternalLink size={10} />
                        </a>
                    </div>

                    <hr className="border-stone-800" />

                    <div>
                        <h4 className="text-white font-bold mb-1">2. Licență Privată (Comercială / Proprietară)</h4>
                        <p>
                            Pentru utilizare comercială, integrare în produse proprietare sau orice altă utilizare care nu este compatibilă cu termenii AGPL,
                            trebuie să obțineți o licență privată (comercială) de la titularul drepturilor de autor.
                        </p>
                        <ul className="list-disc list-inside mt-2 pl-2 space-y-1 text-stone-400">
                            <li>Această opțiune vă permite să utilizați aplicația sau părți din ea fără obligațiile de copyleft ale AGPL.</li>
                            <li>Vă rugăm să contactați dezvoltatorul pentru detalii privind obținerea unei licențe comerciale.</li>
                        </ul>
                    </div>

                    <div className="bg-yellow-900/20 border border-yellow-900/50 p-4 rounded text-yellow-200/80 text-xs">
                        Prin apăsarea butonului "Accept", confirmați că ați înțeles și sunteți de acord să respectați termenii licenței aplicabile (AGPL sau Privată) în funcție de utilizarea dumneavoastră.
                    </div>

                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-stone-800 flex justify-end">
                    <button
                        onClick={handleAccept}
                        className="bg-yellow-600 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded transition-colors duration-200 shadow-lg"
                    >
                        Accept Termenii și Condițiile
                    </button>
                </div>
            </div>
        </div>
    );
};
