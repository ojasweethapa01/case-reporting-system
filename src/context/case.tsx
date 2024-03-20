import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { caseService } from '../services/case';

export interface CaseEntity {
  id: string;
  title: string;
  description: string;
  reportedDate: string;
}

interface CaseContextProps {
  cases: CaseEntity[];
  addCase: (caseData: CaseEntity) => void;
  removeCase: (caseId: string) => void;
  editCase: (id: string, data: Partial<CaseEntity>) => void;
}

const CaseContext = createContext<CaseContextProps>({
  cases: [],
  addCase: () => {},
  removeCase: () => {},
  editCase: () => {},
});

const CaseProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [cases, setCases] = useState<CaseEntity[]>([]);

  const addCase = async (caseData: CaseEntity) => {
    try {
      await caseService.addCase(caseData);
      setCases([...cases, caseData]);
    } catch {
      toast.error('Failed to add case');
    }
  };

  const removeCase = async (caseId: string) => {
    try {
      await caseService.removeCase(caseId);
      setCases(cases.filter((caseItem) => caseItem.id !== caseId));
    } catch {
      toast.error('Failed to remove case');
    }
  };

  const fetchCases = async () => {
    try {
      const data = await caseService.fetchCases();
      setCases(data);
    } catch {
      toast.error('Failed to fetch cases');
    }
  };

  const editCase = async (id: string, data: Partial<CaseEntity>) => {
    try {
      await caseService.editCase(id, data);
      setCases(
        cases.map((caseItem) => {
          if (caseItem.id === id) {
            return { ...caseItem, ...data };
          }
          return caseItem;
        }),
      );
    } catch {
      toast.error('Failed to edit case');
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  return (
    <CaseContext.Provider value={{ cases, addCase, removeCase, editCase }}>
      {children}
    </CaseContext.Provider>
  );
};

export { CaseContext, CaseProvider };
