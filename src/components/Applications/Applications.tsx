import { AppSkeleton } from "../App/AppSkeleton";
import { ApplicationsContent } from "./ApplicationsContent";

export function Applications() {
    return <AppSkeleton>{<ApplicationsContent />}</AppSkeleton>;
}
