
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const subscriptions = [
    {
        subscriptionId: "SUB_001",
        customerName: "Nguyen Van An",
        planTier: "PERSONAL",
        deviceLimit: 2
    },
    {
        subscriptionId: "SUB_002",
        customerName: "Tran Thi Mai",
        planTier: "FAMILY",
        deviceLimit: 5
    },
    {
        subscriptionId: "SUB_003",
        customerName: "Le Van Hung",
        planTier: "PERSONAL",
        deviceLimit: 2
    }
];

function input(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer.trim());
        });
    });
}

function generateSubscriptionId() {
    let maxId = 0;

    for (let i = 0; i < subscriptions.length; i++) {
        let number = Number(
            subscriptions[i].subscriptionId.substring(4)
        );

        if (number > maxId) {
            maxId = number;
        }
    }

    return "SUB_" + String(maxId + 1).padStart(3, "0");
}

async function addSubscription() {
    console.log("\n--- THEM THUE BAO MOI ---");

    const customerName = await input("Nhap ten khach hang: ");

    if (customerName === "") {
        console.log("Ten khach hang khong duoc de trong!");
        return;
    }

    console.log("1. PERSONAL - 2 thiet bi");
    console.log("2. FAMILY - 5 thiet bi");

    const choice = await input("Chon goi cuoc (1-2): ");

    let planTier;
    let deviceLimit;

    if (choice === "1") {
        planTier = "PERSONAL";
        deviceLimit = 2;
    } else if (choice === "2") {
        planTier = "FAMILY";
        deviceLimit = 5;
    } else {
        console.log("Lua chon goi cuoc khong hop le!");
        return;
    }

    const subscription = {
        subscriptionId: generateSubscriptionId(),
        customerName: customerName,
        planTier: planTier,
        deviceLimit: deviceLimit
    };

    subscriptions.push(subscription);

    console.log("Them thue bao thanh cong!");
    console.log("Ma thue bao:", subscription.subscriptionId);
}

function listSubscriptions() {
    console.log("\n--- DANH SACH THUE BAO ---");

    if (subscriptions.length === 0) {
        console.log("Danh sach thue bao dang trong.");
        return;
    }

    console.table(subscriptions);
}

async function updateSubscription() {
    console.log("\n--- CAP NHAT GOI CUOC ---");

    const subscriptionId = await input("Nhap ma thue bao: ");

    let foundSubscription = null;

    for (let i = 0; i < subscriptions.length; i++) {
        if (subscriptions[i].subscriptionId === subscriptionId) {
            foundSubscription = subscriptions[i];
            break;
        }
    }

    if (foundSubscription === null) {
        console.log("Khong tim thay thue bao!");
        return;
    }

    console.log("1. PERSONAL - 2 thiet bi");
    console.log("2. FAMILY - 5 thiet bi");

    const choice = await input("Chon goi cuoc moi (1-2): ");

    if (choice === "1") {
        foundSubscription.planTier = "PERSONAL";
        foundSubscription.deviceLimit = 2;
    } else if (choice === "2") {
        foundSubscription.planTier = "FAMILY";
        foundSubscription.deviceLimit = 5;
    } else {
        console.log("Lua chon goi cuoc khong hop le!");
        return;
    }

    console.log("Cap nhat goi cuoc thanh cong!");
}

async function deleteSubscription() {
    console.log("\n--- HUY THUE BAO ---");

    const subscriptionId = await input("Nhap ma thue bao can huy: ");

    let foundIndex = -1;

    for (let i = 0; i < subscriptions.length; i++) {
        if (subscriptions[i].subscriptionId === subscriptionId) {
            foundIndex = i;
            break;
        }
    }

    if (foundIndex === -1) {
        console.log("Khong tim thay thue bao!");
        return;
    }

    subscriptions.splice(foundIndex, 1);

    console.log("Huy thue bao thanh cong!");
}

async function main() {
    let menuChoice;

    do {
        console.log("\n========== RIKKEISTREAM ==========");
        console.log("1. Them thue bao moi");
        console.log("2. Xem danh sach thue bao");
        console.log("3. Cap nhat goi cuoc");
        console.log("4. Huy thue bao");
        console.log("5. Thoat chuong trinh");
        console.log("==================================");

        menuChoice = await input("Nhap lua chon (1-5): ");

        switch (menuChoice) {
            case "1":
                await addSubscription();
                break;

            case "2":
                listSubscriptions();
                break;

            case "3":
                await updateSubscription();
                break;

            case "4":
                await deleteSubscription();
                break;

            case "5":
                console.log("Da thoat chuong trinh RikkeiStream.");
                break;

            default:
                console.log("Lua chon khong hop le! Vui long nhap tu 1 den 5.");
        }
    } while (menuChoice !== "5");

    rl.close();
}

main();
