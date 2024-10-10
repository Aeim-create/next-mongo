import Supplier from "@/models/Supplier";

// READ (GET all suppliers)
export async function GET() {
  try {
    const suppliers = await Supplier.find();
    return new Response(JSON.stringify(suppliers), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch suppliers" }), { status: 500 });
  }
}

export async function POST(request) {
    try {
      const body = await request.json();
      const supplier = new Supplier(body);
      await supplier.save();
      return new Response(JSON.stringify(supplier), { status: 201 });
    } catch (error) {
      console.error("Error creating supplier:", error);  // Log the actual error
      return new Response(JSON.stringify({ error: "Failed to create supplier", details: error.message }), { status: 400 });
    }
  }
  

// UPDATE (PUT to update a supplier by ID)
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    const supplier = await Supplier.findByIdAndUpdate(id, updateData, { new: true });
    if (!supplier) {
      return new Response(JSON.stringify({ error: "Supplier not found" }), { status: 404 });
    }
    return new Response(JSON.stringify(supplier), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to update supplier" }), { status: 400 });
  }
}

// DELETE (DELETE a supplier by ID)
export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const supplier = await Supplier.findByIdAndDelete(id);
    if (!supplier) {
      return new Response(JSON.stringify({ error: "Supplier not found" }), { status: 404 });
    }
    return new Response(JSON.stringify({ message: "Supplier deleted successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete supplier" }), { status: 500 });
  }
}
