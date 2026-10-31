import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/hooks/useLabRecords", () => ({
  useLabRecords: () => ({ data: [], isLoading: false }),
  useSaveLabRecord: () => ({ mutate: vi.fn(), isPending: false }),
  useDeleteLabRecord: () => ({ mutate: vi.fn(), isPending: false }),
}));
vi.mock("@/pages/dashboard/dlab/dlabMoney", () => ({
  useClientSummaries: () => ({ data: [], cases: [], payments: [], credits: [], invoices: [], isLoading: false }),
  money: (n: number) => `₦${n}`,
  sameClient: () => true,
}));
vi.mock("@/hooks/useDentalLab", () => ({ clientOf: () => "" }));
vi.mock("@/pages/dashboard/dlab/DlabInvoicesPage", () => ({ default: () => <div>Invoices list</div> }));

import DlabBillingPage from "@/pages/dashboard/dlab/DlabBillingPage";

describe("DlabBillingPage", () => {
  it("has two billing tabs; statements live in the client account", () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter initialEntries={["/app/clinic/demo/dlab/billing"]}>
          <DlabBillingPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );
    expect(screen.getAllByRole("tab").map((t) => t.textContent)).toEqual(["Invoices & Receivables", "Payments & Credits"]);
    expect(screen.getByText("Invoices list")).toBeInTheDocument();
  });
});
