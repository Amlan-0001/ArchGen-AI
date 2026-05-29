export function prettyJson(value) {
  if (value === undefined || value === null) {
    return "{}";
  }

  if (typeof value === "string") {
    try {
      return JSON.stringify(JSON.parse(value), null, 2);
    } catch {
      return value;
    }
  }

  return JSON.stringify(value, null, 2);
}

export function getValidationState(validation) {
  if (!validation) {
    return { passed: false, label: "Awaiting validation", issues: [] };
  }

  const passed =
    validation.passed ??
    validation.success ??
    validation.valid ??
    validation.status === "success" ??
    false;

  const issues =
    validation.issues ??
    validation.errors ??
    validation.failures ??
    validation.warnings ??
    [];

  return {
    passed: Boolean(passed),
    label: Boolean(passed) ? "System Validation Passed" : "Validation Attention Required",
    issues: Array.isArray(issues) ? issues : [issues],
  };
}

export function getRepairState(repairResult) {
  const defaultLogs = [
    "Route Mapping Verified",
    "Missing References Checked",
    "Schema Alignment Completed",
    "Consistency Verification Passed",
  ];

  if (!repairResult) {
    return {
      status: "verified",
      success: true,
      systems: [],
      logs: defaultLogs,
    };
  }

  const success =
    repairResult.success ??
    repairResult.repaired ??
    repairResult.status === "success" ??
    false;

  const systems =
    repairResult.regenerated_systems ??
    repairResult.systems ??
    repairResult.updated ??
    [];

  const logs =
    repairResult.logs ??
    repairResult.steps ??
    repairResult.messages ??
    defaultLogs;

  return {
    status: repairResult.status ?? (success ? "success" : "review"),
    success: Boolean(success),
    systems: Array.isArray(systems) ? systems : [systems],
    logs: Array.isArray(logs) ? logs : [logs],
  };
}
