import { REPORT_REASON_MAP } from '@/components/admin/FilterForm';
import BackButton from '@/components/auth/login/BackButton';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';

import { UseReportsReturn } from '@/lib/hooks/useReports';
const REPORT_TITLE = '신고하기';
const ReportModal = ({
  reports,
  reportsData,
}: {
  reports: UseReportsReturn;
  reportsData: ReportActiveType & { id: number };
}) => {
  const {
    closeModal,
    isOpen,
    selectedReason,
    submitReport,
    toggleReason,
    isPending,
  } = reports;

  if (!isOpen) return null;
  return (
    <Modal isOpen={isOpen} onClose={closeModal} height="h-[72rem]">
      <section className="w-full flex h-full flex-col justify-between">
        <div className="flex justify-between items-center">
          <span className="leading-[4.2rem] text-[2.8rem] font-bold">
            {REPORT_TITLE}
          </span>
          {<BackButton onClose={closeModal} />}
        </div>
        <div className="flex flex-1 flex-col mt-[4.8rem] mb-[6.8rem]">
          {/* 내용라인 */}
          <div className="flex flex-col py-[2.8rem] border-y-[.2rem]">
            <div className="flex flex-col gap-[1.2rem]">
              <p className="flex items-center">
                <span className="report-writter-text">작성자</span>{' '}
                <span className="divider"></span>
                <span className="report-content-text">
                  {reportsData.author}
                </span>
              </p>
              <p className="flex items-center">
                <span className="report-writter-text">내용</span>{' '}
                <span className="divider"></span>
                <span className="report-content-text">
                  {reportsData.content}
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-col pt-[2.8rem] gap-[1.6rem]">
            <p className="report-writter-text">신고사유</p>
            <div className="space-y-[1.2rem]">
              {Object.entries(REPORT_REASON_MAP).map(([id, label]) => (
                <label
                  key={id}
                  className="flex items-center gap-[1.2rem] cursor-pointer report-content-text"
                >
                  <input
                    type="checkbox"
                    className="w-[2rem] h-[2rem]"
                    value={id}
                    checked={selectedReason.includes(Number(id))}
                    onChange={() => toggleReason(Number(id))}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
        </div>
        <Button
          size="lg"
          btnColor="blue"
          className=""
          onClick={() => submitReport()}
          disabled={selectedReason.length === 0}
        >
          {isPending ? '' : '신고하기'}
        </Button>
      </section>
    </Modal>
  );
};

export default ReportModal;
