import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { promisify } from "util";
import path from "path";

const pump = promisify(require("stream").pipeline);

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const formData = await req.formData();
        const files = formData.getAll("files");

        if (files.length > 0) {
            const file: File = files[0] as File;
            const publicDir = path.resolve(process.cwd(), "public");
            debugger;
            fs.mkdirSync(publicDir, { recursive: true });
            const filePath = path.join(publicDir, file.name);
            const fileStream = fs.createWriteStream(filePath);
            const readableStream = file.stream();
            await pump(readableStream, fileStream);
            await new Promise((resolve, reject) => {
                fileStream.on("finish", resolve);
                fileStream.on("error", reject);
            });

            return NextResponse.json({ status: "success", data: file.size });
        } else {
            return NextResponse.json({ status: "fail", data: "No files provided" });
        }
    } catch (e) {
        return NextResponse.json({ status: "fail", data: e });
    }
}
