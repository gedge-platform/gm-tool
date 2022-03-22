const TargetTypes = {
    CLUSTER: "cluster",
    APPLICATION: "app",
    NAMESPACE: "namespace",
    POD: "pod",
    NODE: "node",
};

const ClusterMetricTypes = {
    CPU_USAGE: "cpu_usage",
    CPU_UTIL: "cpu_util",
    CPU_TOTAL: "cpu_total",
    MEMORY_USAGE: "memory_usage",
    MEMORY_UTIL: "memory_util",
    MEMORY_TOTAL: "memory_total",
    DISK_USAGE: "disk_usage",
    DISK_UTIL: "disk_util",
    DISK_TOTAL: "disk_total",
    POD_QUOTA: "pod_quota",
    POD_RUNNING: "pod_running",
    POD_UTIL: "pod_util",
    APISERVER_REQUEST_RATE: "apiserver_request_rate",
    APISERVER_LATENCY: "apiserver_latency",
    SCHEDULER_ATTEMPT_TOTAL: "scheduler_attempt_total",
    SCHEDULER_FAIL_TOTAL: "scheduler_fail_total",
    SCHEDULER_LATENCY: "scheduler_latency",
    CPU_ALL: "cpu_usage|cpu_util|cpu_total",
    MEMORY_ALL: "memory_usage|memory_util|memory_total",
    DISK_ALL: "disk_usage|disk_util|disk_total",
    POD_ALL: "pod_quota|pod_running|pod_util",
    APISERVER_ALL: "apiserver_request_rate|apiserver_latency",
    SCHEDULER_ALL:
        "scheduler_attempt_total|scheduler_fail_total|scheduler_latency",
    ALL: "cpu_usage|cpu_util|cpu_total|memory_usage|memory_util|memory_total|disk_usage|disk_util|disk_total|pod_quota|pod_running|pod_util|apiserver_request_rate|apiserver_latency|scheduler_attempt_total|scheduler_fail_total|scheduler_latency",
};

// const ApplicationMetricValues = {
//     POD_COUNT: "pod_count",
//     SERVICE_COUNT: "service_count",
//     DEVPLOYMENT_COUNT: "deployment_count",
//     CRONJOB_COUNT: "cronjob_count",
//     MEMORY_TOTAL: "memory_total",
//     JOB_COUNT: "job_count",
//     PV_COUNT: "pv_count",
//     DISK_TOTAL: "disk_total",
//     PVC_COUNT: "pvc_count",
//     NAMESPACE_COUNT: "namespace_count",
// };

// const NamespaceMetricValues = {
//     CPU_UASGE: "namespace_cpu",
//     CPU_UASGE: "namespace_memory",
//     CPU_UASGE: "namespace_pod_count",
// };

// const PodMetricValues = {
//     CPU_UASGE: "pod_cpu",
//     CPU_UASGE: "pod_memory",
//     CPU_UASGE: "pod_net_bytes_transmitted",
//     CPU_UASGE: "pod_net_bytes_received",
// };

// const NodeMetricValues = {
//     CPU_UASGE: "node_cpu_usage",
//     CPU_UASGE: "node_cpu_util",
//     CPU_UASGE: "node_cpu_total",
//     CPU_UASGE: "node_memory_usage",
//     CPU_UASGE: "node_memory_util",
//     CPU_UASGE: "node_memory_total",
//     CPU_UASGE: "node_disk_usage",
//     CPU_UASGE: "node_disk_util",
//     CPU_UASGE: "node_disk_total",
//     CPU_UASGE: "node_pod_running",
//     CPU_UASGE: "node_pod_quota",
//     CPU_UASGE: "node_disk_inode_util",
//     CPU_UASGE: "node_disk_inode_total",
//     CPU_UASGE: "node_disk_inode_usage",
//     CPU_UASGE: "node_disk_read_iops",
//     CPU_UASGE: "node_disk_write_iops",
//     CPU_UASGE: "node_disk_read_throughput",
//     CPU_UASGE: "node_disk_write_throughput",
//     CPU_UASGE: "node_net_bytes_transmitted",
//     CPU_UASGE: "node_net_bytes_received",
//     CPU_UASGE: "node_info",
// };

export {
    ClusterMetricTypes,
    TargetTypes,
    // ApplicationMetricValues,
    // NamespaceMetricValues,
    // NodeMetricValues,
    // PodMetricValues,
};
