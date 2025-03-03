import Toast from "@/components/Toast.vue";
import { useToast as useToastGlobal, TYPE } from "vue-toastification";
export { TYPE } from "vue-toastification";
export interface IToast {
  tipo?: TYPE;
  duracao?: number;
}
export const closeToast = (id?: string | number) => {
  if (id) {
    useToastGlobal().dismiss(id);
  } else {
    useToastGlobal().clear();
  }
};
export const useToast = (
  texto: string,
  OpcoesToast?: IToast
): string | number => {
  const id = useToastGlobal()(
    {
      component: Toast,
      props: {
        text: texto,
        type: OpcoesToast?.tipo || TYPE.SUCCESS,
      },
    },
    {
      type: OpcoesToast?.tipo || TYPE.SUCCESS,
      timeout: OpcoesToast?.duracao || 5000,
    }
  );
  return id;
};
