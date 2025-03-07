


export async function POST (req: Request) {

  try {

    const body = await req.json ();

    console.log ("body", body);

    return Response.json ({
      status: "success",
      data: {
        message: "Good"
      }
    }, { status: 200 });

  } catch (error) {

    console.log ("error", error);

    return Response.json ({
      status: "error",
      error: {
        message: "Something Went Wrong"
      }
    }, { status: 500 });

  }

}