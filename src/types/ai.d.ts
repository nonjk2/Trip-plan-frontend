type outPutReturnVal = {
  planData: {
    order: number;
    place: string;
    streetAddress: string;
    latitude: string;
    longitude: string;
    planCategoryNameId: number;
    placeUrl?: string;
    phone?: string;
    description?: string;
    isLifestyleName: boolean;
  };
};
type toolOutputData = {
  tool_call_id: string;
  output: outPutReturnVal;
};

type MsgType = {
  sender: 'user' | 'ai';
  text: string;
  tooloutPutData?: toolOutputData[];
}[];
type parsingData = {
  planData: PlanDataType;
};
