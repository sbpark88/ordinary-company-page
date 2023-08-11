import { toast } from "react-toastify";
import $K from "../data/Constants";

export const preventWindowScroll = (stopScroll) => () =>
  stopScroll
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

export const Toast = {
  info: (content) => toast.info(content, $K.TOAST_POSITION),
  success: (content) => toast.success(content, $K.TOAST_POSITION),
  error: (content) => toast.error(content, $K.TOAST_POSITION),
};

export const toastDefaultApiError = () =>
  Toast.error("데이터 조회에 실패하였습니다.");

const Confirm =
  (
    { question, explanation, btnConfirm, btnCancel },
    { feedbackTitle, feedbackExplanation, btnFeedbackOk = "확인" }
  ) =>
  async (confirmClosure, feedbackClosure) => {
    const Swal = require("sweetalert2");
    const withReactContent = require("sweetalert2-react-content");

    const MySwal = withReactContent(Swal);

    const confirm = await MySwal.fire({
      title: question,
      text: explanation,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: btnConfirm,
      confirmButtonColor: $K.COLOR.DELETE,
      cancelButtonText: btnCancel,
      cancelButtonColor: $K.COLOR.CANCEL,
    });

    if (confirm.isConfirmed) {
      const confirmClosureResponse = await confirmClosure();
      if (
        confirmClosureResponse === true ||
        confirmClosureResponse.status === 200 ||
        confirmClosureResponse.statusText === "OK"
      ) {
        const feedback = await MySwal.fire({
          title: feedbackTitle,
          text: feedbackExplanation,
          icon: "success",
          confirmButtonText: btnFeedbackOk,
          confirmButtonColor: $K.COLOR.APPROVAL,
        });

        if (feedback.isConfirmed) {
          feedbackClosure();
        }
      }
    }
  };

export const ConfirmDelete = Confirm(
  {
    question: "삭제하시겠습니까?",
    explanation: "삭제 후에는 복구가 불가능합니다.",
    btnConfirm: "삭제",
    btnCancel: "취소",
  },
  {
    feedbackTitle: "삭제",
    feedbackExplanation: "요청이 성공적으로 처리되었습니다.",
    btnFeedbackOk: "확인",
  }
);
