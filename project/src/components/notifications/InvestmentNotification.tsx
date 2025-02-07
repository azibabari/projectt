import React from 'react';
import { Bell } from 'lucide-react';
import { format } from 'date-fns';
import { Investment } from '@/types/investment';

interface InvestmentNotificationProps {
  investment: Investment;
  onClose: () => void;
}

const InvestmentNotification: React.FC<InvestmentNotificationProps> = ({
  investment,
  onClose,
}) => {
  return (
    <div className="fixed bottom-4 right-4 max-w-sm bg-white rounded-lg shadow-lg p-4 border border-primary animate-in slide-in-from-right">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Bell className="h-6 w-6 text-primary" />
        </div>
        <div className="ml-3 w-0 flex-1">
          <p className="text-sm font-medium text-gray-900">
            Investment Maturity Alert
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Your investment in {investment.package?.name} will mature on{' '}
            {format(new Date(investment.maturity_date), 'MMMM d, yyyy')}
          </p>
          <div className="mt-4 flex">
            <button
              type="button"
              className="text-sm font-medium text-primary hover:text-primary-dark"
              onClick={onClose}
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentNotification;